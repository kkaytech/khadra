"use client";
import { useState } from "react";
import { buildings, apartments } from "./mockData";

export default function Home() {
  const [buildingId, setBuildingId] = useState(buildings[0].id);
  const [apartment, setApartment] = useState("");
  const [step, setStep] = useState<"onboarding" | "meter">("onboarding");

  const [meterData, setMeterData] = useState({ electricity: "", water: "" });

  // Find the user's previous readings, or default values
  const prevApartment = apartments.find(
    (a) => a.number === apartment && a.buildingId === buildingId
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("meter");
    // You can store user's info in state/context here for later use
  };

  const handleMeterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd update leaderboard/mocks here
    alert(
      `Meter Reading Submitted!\nElectricity: ${meterData.electricity}\nWater: ${meterData.water}`
    );
    // Proceed to leaderboard or results screen
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50">
      {step === "onboarding" ? (
        <form
          className="bg-white p-8 rounded shadow-md flex flex-col gap-4 w-full max-w-sm"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-green-700 mb-4">
            Khadra Onboarding
          </h1>
          <label>
            Choose Building:
            <select
              className="block w-full mt-1 p-2 border rounded"
              value={buildingId}
              onChange={(e) => setBuildingId(Number(e.target.value))}
            >
              {buildings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Apartment Number:
            <input
              type="text"
              className="block w-full mt-1 p-2 border rounded"
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
              placeholder="e.g., 1001"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </form>
      ) : (
        <form
          className="bg-white p-8 rounded shadow-md flex flex-col gap-4 w-full max-w-sm"
          onSubmit={handleMeterSubmit}
        >
          <h1 className="text-2xl font-bold text-green-700 mb-4">
            Submit Meter Readings
          </h1>
          <label>
            Electricity Meter:
            <input
              type="number"
              className="block w-full mt-1 p-2 border rounded"
              value={meterData.electricity}
              onChange={(e) =>
                setMeterData((d) => ({
                  ...d,
                  electricity: e.target.value,
                }))
              }
              placeholder={
                prevApartment?.lastReading.electricity?.toString() || "Previous"
              }
              required
            />
          </label>
          <label>
            Water Meter:
            <input
              type="number"
              className="block w-full mt-1 p-2 border rounded"
              value={meterData.water}
              onChange={(e) =>
                setMeterData((d) => ({
                  ...d,
                  water: e.target.value,
                }))
              }
              placeholder={
                prevApartment?.lastReading.water?.toString() || "Previous"
              }
              required
            />
          </label>
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
