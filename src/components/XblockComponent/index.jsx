import React from 'react';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class XBlockComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // componentDidMount() {
  //   console.log(this.getViewUrl());
  //   console.log(this.props.cookies.get('csrftoken'))
  //   const blockUrl = this.getViewUrl();
  //   fetch(blockUrl, {
  //     credentials: "include",
  //     headers: {
  //       'X-CSRFToken': this.props.cookies.get('csrftoken')
  //     }
  //   })
  //   // TODO: handle response error
  //   .then(response => response.text())
  //   .then(async(data) => {
  //     const xblockContent = document.createElement('div');
  //     xblockContent.innerHTML = data;
  //     const scripts = [...xblockContent.getElementsByTagName('script')]
  //     const links = [...xblockContent.getElementsByTagName('link')]

  //     this.removeChildren(scripts);
  //     this.removeChildren(links);
  //     this.setState({ xblockContent: xblockContent.outerHTML });
  //     this.addLinksToHead(links);
      
  //     await this.insertScripts(scripts);
  //   })
  //   .catch(function(ex) {
  //     console.log("failed to fetch", ex);
  //   });
  // }

  async insertScripts (scripts) {
    for (let script of scripts) {
      await this.insertScript(script);
    }
  }

  addLinksToHead(links) {
    for (let link of links) {
      link.type = 'text/css';
      const srcUrl = new URL(link.href);
      if (srcUrl.hostname === window.location.hostname && srcUrl.port === window.location.port) {
        link.href = `${this.getLmsHost()}${srcUrl.pathname}`;
      }
      document.head.appendChild(link);
    }
  }

  removeChildren(children) {
    for (let child of children) {
      child.parentNode.removeChild(child);
    }
  }

  insertScript (script) {
    return new Promise((resolve, reject) => {
      console.log('in insertScript');
      const s = document.createElement('script');
      s.type = script.type;
      if (script.src) {
        s.onload = () => {
          resolve();
        }
        s.onerror = reject;
        
        // Override src for relative urls since document.createElement will make them point to local
        const srcUrl = new URL(script.src);
        console.log('Checking for remote source modification: ' + script.src);
        console.log(srcUrl.hostname);
        console.log(srcUrl.port);
        if (srcUrl.hostname === window.location.hostname && srcUrl.port === window.location.port) {
          script.src = `${this.getLmsHost()}${srcUrl.pathname}`;
        }
        
        s.src = script.src;
      } else {
        // TODO: clean this up
        // Hack away at requirejs to set baseURL to lms
        if (script.innerText.trim().startsWith('window.baseUrl = ')) {
          script.innerText = this.getRequireConfigScript();
        }
        if (script.id) {
          s.id = script.id;
        }
        if (script.class) {
          s.class = script.class;
        }
        s.textContent = script.innerText;
      }
    
      // re-insert the script tag so it executes.
      document.head.appendChild(s);
    
      // run the callback immediately for inline scripts
      if (!script.src) {
        resolve()
      }
    });
  }
  
  getRequireConfigScript() {
    return `
      window.baseUrl = "${this.getLmsHost()}/static/";
      (function (require) {
        require.config({
            baseUrl: window.baseUrl
        });
      }).call(this, require || RequireJS.require);
      `
  }

  getLmsHost() {
    return this.props.useCurrentHost ? `${window.location.hostname}:${window.location.port}` : this.props.lmsHost
  }

  getViewUrl() {
    // TODO: consider using unpublished JSON API: `${this.getLmsHost()}/courses/${this.props.courseId}/xblock/${this.props.usageId}/view/${this.props.blockView}`;
    return `${this.getLmsHost()}/xblock/${this.props.usageId}?view=${this.props.blockView}`;
  }

  render() {
    return (
    <div class="embed-responsive embed-responsive-1by1">
        <iframe src={this.getViewUrl()} />
    </div>
    );
  }
}

XBlockComponent.propTypes = {
  usageId: PropTypes.string.isRequired,
  sessionId: PropTypes.string,
  useCurrentHost: PropTypes.bool,
  lmsHost: PropTypes.string,
  onNotify: PropTypes.func,
  onRouteChange: PropTypes.func,
  blockView: PropTypes.string,
};


XBlockComponent.defaultProps = {
  blockView: 'student_view',
};


export default withCookies(XBlockComponent);
