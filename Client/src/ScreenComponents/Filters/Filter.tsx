import { NavArrowRight, Xmark } from "iconoir-react";
import { Button, Input, Text } from "../../Exports/Exports";
import { motion } from "framer-motion";
import { useState } from "react";
import { useApi } from "../../Providers/ApiProvider";

export default function Filter() {
  // Provider ------------------------------------------------------------------------------------------------------------------------------
  const { transactions, filterByTransactions, ResetFilter } = useApi();

  // Variables -----------------------------------------------------------------------------------------------------------------------------

  const vehicleTypes = transactions.filter(
    (transactions, index, self) =>
      index ===
      self.findIndex((t) => t.vehicle_type === transactions.vehicle_type)
  );
  const Colors = transactions.filter(
    (Colors, index, self) =>
      index === self.findIndex((t) => t.vehicle_color === Colors.vehicle_color)
  );
  const Dealers = transactions.filter(
    (Colors, index, self) =>
      index === self.findIndex((t) => t.dealer === Colors.dealer)
  );

  // States --------------------------------------------------------------------------------------------------------------------------------

  // Color States
  const [colorDropdown, setColorDropdown] = useState(false);
  const [colorArray, setColorArray] = useState(Colors);

  // Vehicle Type States
  const [vehicleDropdown, setVehicleDropdown] = useState(false);
  const [vehicleArray, setVehicleArray] = useState(vehicleTypes);

  // Dealer States
  const [dealerDropdown, setDealerDropdown] = useState(false);
  const [dealerArray, setDealerArray] = useState(Dealers);

  // Status States
  const [statusDropdown, setStatusDropdown] = useState(false);

  const [filters, setFilters] = useState({
    date_in: "",
    date_out: "",
    vehicle_type: "",
    vehicle_color: "",
    dealer: "",
    status: "",
  });

  // functions -------------------------------------------------------------------------------------------------------------------------

  // Date FilterFunction
  const DateInputFunction = ({
    e,
    filterBy,
  }: {
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    filterBy: keyof Car;
  }) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterBy]: "Clear",
    }));
    filterByTransactions({ value, filterBy });
  };

  // Color Input Filter Function
  const ColorInputFunction = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setColorDropdown(true);
    if (value.trim() === "") {
      setColorArray(Colors);
    } else {
      const filterColor = Colors.filter((color) =>
        color.vehicle_color.toLowerCase().includes(value.toLowerCase())
      );
      setColorArray(filterColor);
    }
  };

  // Vehicle Input Filter Function
  const VehicleInputFunction = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setVehicleDropdown(true);
    if (value.trim() === "") {
      setVehicleArray(vehicleTypes);
    } else {
      const filterVehicles = vehicleTypes.filter((types) =>
        types.vehicle_type.toLowerCase().includes(value.toLowerCase())
      );
      setVehicleArray(filterVehicles);
    }
  };
  // Dealer Input Filter Function
  const DealerInputFunction = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDealerDropdown(true);
    if (value.trim() === "") {
      setDealerArray(Dealers);
    } else {
      const filterDealers = Dealers.filter((dealer) =>
        dealer.dealer.toLowerCase().includes(value.toLowerCase())
      );
      setDealerArray(filterDealers);
    }
  };

  // Clear Filter Function
  const handleClearFilters = () => {
    setFilters({
      date_in: "",
      date_out: "",
      vehicle_color: "",
      vehicle_type: "",
      dealer: "",
      status: "",
    });
    ResetFilter(); // Reset the filter logic
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2 z-30">
        {/* Clear Filter Button */}
        <Button
          color="primary"
          text={
            filters.date_in ||
            filters.date_out ||
            filters.dealer ||
            filters.status ||
            filters.vehicle_type ||
            filters.vehicle_color === "Clear"
              ? "Clear Filter"
              : "Filter Options"
          }
          icon_right={
            filters.date_in ||
            filters.date_out ||
            filters.dealer ||
            filters.status ||
            filters.vehicle_type ||
            filters.vehicle_color === "Clear" ? (
              <Xmark />
            ) : undefined
          }
          size="sm"
          rounded="medium"
          position="center"
          onclick={() => handleClearFilters()}
        />
        {/* date In filter */}
        <div>
          {filters.date_in === "" && (
            <Button
              color="primary"
              icon_right={<NavArrowRight />}
              outline
              text="Date In"
              size="xs"
              rounded="medium"
              position="center"
              onclick={() =>
                setFilters((prev) => ({ ...prev, date_in: "Input" }))
              }
            />
          )}
          {filters.date_in === "Input" && (
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}>
              <Input
                type="date"
                outside_icon={false}
                InputFunction={(e) =>
                  DateInputFunction({ e, filterBy: "date_in" })
                }
              />
            </motion.div>
          )}
          {filters.date_in === "Clear" && (
            <Button
              color="primary"
              text="Date In"
              size="xs"
              rounded="medium"
              position="center"
            />
          )}
        </div>
        {/* date out Filter */}
        <div>
          {filters.date_out === "" && (
            <Button
              color="primary"
              icon_right={<NavArrowRight />}
              outline
              text="Date Out"
              size="xs"
              rounded="medium"
              position="center"
              onclick={() =>
                setFilters((prev) => ({ ...prev, date_out: "Input" }))
              }
            />
          )}
          {filters.date_out === "Input" && (
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}>
              <Input
                type="date"
                outside_icon={false}
                InputFunction={(e) =>
                  DateInputFunction({ e, filterBy: "date_out" })
                }
              />
            </motion.div>
          )}
          {filters.date_out === "Clear" && (
            <Button
              color="primary"
              text="Date Out"
              size="xs"
              rounded="medium"
              position="center"
            />
          )}
        </div>
        {/* Car Model Filter */}
        <div>
          {filters.vehicle_type === "" && (
            <Button
              color="primary"
              icon_right={<NavArrowRight />}
              outline
              text="Car Model"
              size="xs"
              rounded="medium"
              position="center"
              onclick={() =>
                setFilters((prev) => ({ ...prev, vehicle_type: "Input" }))
              }
            />
          )}
          {filters.vehicle_type === "Input" && (
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}>
              <Input
                type="text"
                outside_icon={false}
                InputFunction={(e) => VehicleInputFunction(e)}
              />
              {vehicleDropdown && (
                <div className="absolute w-full flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg h-48 overflow-y-scroll z-10 bg-primary-900">
                  {vehicleArray.map((item, index) => (
                    <Button
                      key={index}
                      gap="justify-between"
                      color="primary"
                      onclick={() => [
                        filterByTransactions({
                          filterBy: "vehicle_type",
                          value: item.vehicle_type,
                        }),
                        setVehicleDropdown(false),
                        setFilters((prev) => ({
                          ...prev,
                          vehicle_type: "Clear",
                        })),
                      ]}
                      outline
                      size="sm"
                      stretch
                      text={item.vehicle_type}
                      rounded="medium"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
          {filters.vehicle_type === "Clear" && (
            <Button
              color="primary"
              text="Car Model"
              size="xs"
              rounded="medium"
              position="center"
            />
          )}
        </div>
        {/* Color Filter */}
        <div>
          {filters.vehicle_color === "" && (
            <Button
              color="primary"
              icon_right={<NavArrowRight />}
              outline
              text="Color"
              size="xs"
              rounded="medium"
              position="center"
              onclick={() =>
                setFilters((prev) => ({ ...prev, vehicle_color: "Input" }))
              }
            />
          )}
          {filters.vehicle_color === "Input" && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              className="relative"
            >
              <Input
                type="text"
                outside_icon={false}
                InputFunction={(e) => ColorInputFunction(e)}
              />
              {colorDropdown && (
                <div className="absolute w-full flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg h-48 overflow-y-scroll z-10 bg-primary-900">
                  {colorArray.map((item, index) => (
                    <Button
                      key={index}
                      gap="justify-between"
                      color="primary"
                      onclick={() => [
                        filterByTransactions({
                          filterBy: "vehicle_color",
                          value: item.vehicle_color,
                        }),
                        setColorDropdown(false),
                        setFilters((prev) => ({
                          ...prev,
                          vehicle_color: "Clear",
                        })),
                      ]}
                      outline
                      size="sm"
                      stretch
                      text={item.vehicle_color}
                      rounded="medium"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
          {filters.vehicle_color === "Clear" && (
            <Button
              color="primary"
              text="Color"
              size="xs"
              rounded="medium"
              position="center"
            />
          )}
        </div>
        {/* Dealer Filter */}
        <div>
          {filters.dealer === "" && (
            <Button
              color="primary"
              icon_right={<NavArrowRight />}
              outline
              text="Dealer"
              size="xs"
              rounded="medium"
              position="center"
              onclick={() =>
                setFilters((prev) => ({ ...prev, dealer: "Input" }))
              }
            />
          )}
          {filters.dealer === "Input" && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              className="relative"
            >
              <Input
                type="text"
                outside_icon={false}
                InputFunction={(e) => DealerInputFunction(e)}
              />
              {dealerDropdown && (
                <div className="absolute w-full flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg h-48 overflow-y-scroll z-10 bg-primary-900">
                  {dealerArray.map((item, index) => (
                    <Button
                      key={index}
                      gap="justify-between"
                      color="primary"
                      onclick={() => [
                        filterByTransactions({
                          filterBy: "dealer",
                          value: item.dealer,
                        }),
                        setDealerDropdown(false),
                        setFilters((prev) => ({
                          ...prev,
                          dealer: "Clear",
                        })),
                      ]}
                      outline
                      size="sm"
                      stretch
                      text={item.dealer}
                      rounded="medium"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
          {filters.dealer === "Clear" && (
            <Button
              color="primary"
              text="Dealer"
              size="xs"
              rounded="medium"
              position="center"
            />
          )}
        </div>
        {/* Status Filter */}
        <div>
          {filters.status === "" && (
            <div className="relative">
              <Button
                color="primary"
                icon_right={<NavArrowRight />}
                outline
                text="Status"
                size="xs"
                rounded="medium"
                position="center"
                onclick={() => setStatusDropdown(true)}
              />

              {statusDropdown && (
                <div className="absolute w-fit flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg h-48 overflow-y-scroll z-10">
                  {["sold", "unsold", "withdrawn"].map((item, index) => (
                    <Button
                      key={index}
                      gap="justify-between"
                      color="primary"
                      onclick={() => [
                        filterByTransactions({
                          filterBy: "status",
                          value: item,
                        }),
                        setStatusDropdown(false),
                        setFilters((prev) => ({
                          ...prev,
                          status: "Clear",
                        })),
                      ]}
                      outline
                      size="sm"
                      stretch
                      text={item}
                      rounded="medium"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {filters.status === "Clear" && (
            <Button
              color="primary"
              text="Status"
              size="xs"
              rounded="medium"
              position="center"
            />
          )}
        </div>
      </div>
      <Text text={`Results: ${transactions.length.toString()}`} />
    </div>
  );
}
