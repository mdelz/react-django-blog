import PropTypes from "prop-types";

export default function Tag(props) {
  return <span class="badge bg-secondary">{props.label}</span>;
}

Tag.propTypes = {
  key: PropTypes.string.isRequired,
};
