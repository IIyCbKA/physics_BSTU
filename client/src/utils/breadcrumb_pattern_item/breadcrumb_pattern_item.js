import "./styles/style_bradcrumb_pattern.css";

export default function BreadcrumbPatternItem(props) {
  return (
    <a href={props.currentPath} className="breadcrumb-pattern-wrap">
      <div className="breadcrumb-pattern-main">{props.title}</div>
    </a>
  );
}
