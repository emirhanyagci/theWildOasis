import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "./CabinTable";
function AddCabin() {
  return (
    <Modal>
      <Modal.Open open="cabin-form">
        <Button> Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open open="table">
        <Button> Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

//old version
// function AddCabin() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div>
//       <Button
//         onClick={() => {
//           setIsModalOpen(true);
//         }}
//       >
//         Add new cabin
//       </Button>
//       {isModalOpen ? (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />
//         </Modal>
//       ) : null}
//     </div>
//   );
// }

export default AddCabin;
