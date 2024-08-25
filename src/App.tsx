import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TableComponent from "./components/Table/TableComponent";
import { Row } from "reactstrap";

function App() {
  return (
    <>
      <div className="d-flex flex-column ">
        <Row>
          <TableComponent />
        </Row>
      </div>
    </>
  );
}

export default App;
