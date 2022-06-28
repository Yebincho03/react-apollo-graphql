import { DeleteOutlined } from "@ant-design/icons";
import { REMOVE_CAR, PERSON_WITH_CARS } from "../../queries copy";
import { useMutation } from "@apollo/client";
import { filter } from "lodash";

const RemoveCar = (props) => {
  const { id, personId } = props;
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const data = cache.readQuery({ query: PERSON_WITH_CARS(personId) });
      cache.writeQuery({
        query: PERSON_WITH_CARS(personId),
        data: {
          person: data.person,
          cars: filter(data.cars, (c) => c.id !== removeCar.id),
        },
      });
    },
  });
  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this car?");

    if (result) {
      removeCar({
        variables: {
          id,
        },
      });
    }
  };
  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};

export default RemoveCar;
