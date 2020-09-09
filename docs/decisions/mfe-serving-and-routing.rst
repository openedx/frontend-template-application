3. Micro-frontend Routing and HTTP Status Codes
###############################################

Status
======

Accepted

Context
=======

To be clear, this ADR is being written as retro-active documentation of a decision already made regarding how we serve our MFEs. 

In a traditional web application, a backend service is responsible for "routing" - serving HTML documents at various URL paths owned by the service.  They own the entire HTTP response, including its body and headers. Our Open edX micro-frontends (MFEs) are not served by a traditional web application server like nginx, but by a storage service like S3 which have their own mechanisms (often via a console interface) for configuring routing and HTTP responses.  This approach can impose some limitations on our ability to modify headers and status codes (403, 404, etc.) 

Decision
========

We chose to deploy our MFEs to storage services like S3, rather than via Django/nginx and its static asset pipeline, as we have historically done. Our MFEs are served through a CDN like CloudFront or Cloudflare.  We did this so that we can easily deploy new MFEs independently and then route to them via configuration in our existing backend micro-services.  It creates a strong boundary between the MFE and any services it may use in the the form of APIs.

We use the CDN's routing capabilities to point all paths that an MFE may utilize to the same index.html file.  We delegate further routing within the MFE to client-side routing libraries like react-router, which use standard browser APIs on the client to modify the URL (without a page refresh) as the user navigates around the MFE.  On a hard refresh or navigating to the MFE from some other URL (outside the MFE), the server's routing is responsible for re-serving the index.html file.

Consequences
============

This has the benefit of creating a strong bounded context/separation of concerns between the MFE and its associated backends.  It also means we have limited ability to contextually modify our HTTP response headers in-flight when loading an MFE.

This approach lends itself well to our current "sub-domain" approach to serving MFEs, where each MFE exists on its own sub-domain of the main site (e.g., edx.org).  Configuring S3/CDNs for this is squarely in their wheelhouse, and is something that's probably already happening in a management console like AWS Route 53, etc. 

If, however, we want to do path-specific MFEs on existing sub-domains, this creates a situation where we're splitting our path routing configuration between our micro-services (think Django urls.py), our CDN configuration, and our client-side routers.  That may be difficult to maintain.

The most common manifestation/limitation around this is returning meaningful status codes to the browser, such as 404s or 403s for forbidden pages.  CloudFront, Cloudflare and similar services provide facilities for working with responses, but that means that today we can't use configuration-as-code to set this up, and there is no good template for Open edX operators to use to set up their own instances.  An existing instance of an MFE must be reverse-engineered.

Many of our MFEs provide soft-404 pages that they display for client-side routes that they don't understand.  These pages visually present as a 404, but lack an appropriate status code, since they were generated client-side after the index.html file loaded.

For MFEs that contain dynamic URLs that may sometimes result in a 404 or 403 for content - such as a user profile page, or a learning sequence in a course - The behavior of our MFEs is less than ideal.  In the situation where we try to load a non-existent user profile at a URL like:

/u/fake_username

We must go through the following sequence before showing a 404 to the user:

1. Load the index.html file.
2. Load the MFE's static assets and JavaScript.
3. Make an API request to the LMS to try to load user data for a user with the username "fake_username".
4. Process the response to discover that user doesn't exist.
5. Show our soft-404 page.

You can imagine a 403 forbidden page would need to follow a similar process, resulting in situations where a user must load the whole application, effectively, only to be shown an error page.  This is less than ideal from a UX perspective.

Rejected Alternatives
=====================

These alternatives are rejected, in that we don't currently do them, but are worth considering in the author's opinion.  These are by no means complete; they're just here for some context.

The main benefit of either is that it would bring our routing into code, allowing us to potentially access business logic, have more fine-grained control over our HTTP responses, and lend itself to better documentation by breaking us out of the "management console" approach we currently use.

index.html rendered by micro-services
-------------------------------------

One option would be for us to use an associated backend micro-service to serve the routes for our micro-frontends.  This would allow us to use server-side logic to determine 1) if the route is valid, and 2) potentially load some data up front so that the initial rendering of index.html can be correct faster.

This would also have the side-benefit of allowing us to refresh our authentication JWT on page load, rather than making a separate request to do so after the MFE spins up.

Routing via a dedicated routing application
-------------------------------------------

We have floated the idea of putting a routing application in front of our MFEs and traditional micro-services.  This would potentially be a mild improvement with respect to configuring path-based routes because it'd bring it closer to the rest of our routing code, and since it's effectively configuration-as-code, would be self-documenting.
