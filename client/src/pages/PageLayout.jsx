import "../styles/PageLayout.css";
import { TopBar } from "../components/TopBar";

function PageLayout({ children }) {
  return (
    <div className="layoutWrapper">
      <TopBar />
      <div className="pageContent">{children}</div>
    </div>
  );
}

export { PageLayout };
