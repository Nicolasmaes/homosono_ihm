import "./ExploreContainer.css";

interface ContainerProps {
  name: string;
  message: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name, message }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>
        Explore{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ionicframework.com/docs/components"
        >
          UI Components
        </a>
      </p>
      <p>{message}</p>
    </div>
  );
};

export default ExploreContainer;
