/* eslint-disable react/prop-types */
const SectionPlaceholderTab = ({
  title,
  description,
}) => (
  <div className="framework-builder__section-card">
    <h3 className="framework-builder__section-title">{title}</h3>
    <p className="framework-builder__section-description">{description}</p>
  </div>
);

export default SectionPlaceholderTab;
