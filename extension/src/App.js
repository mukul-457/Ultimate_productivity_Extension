import AddCircleIcon from "@mui/icons-material/AddCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import "./App.css";

function App() {
  return (
    // parent-div
    <div className="relative parent p-3 flex flex-col bg-cover bg-no-repeat bg-scroll backdrop-blur-md h-screen w-screen">
      <div className="flex flex-row justify-end">
        <h1 className="font-bold text-lg text-blue-base">13 January, 2023</h1>
      </div>

      {/* add task div */}
      <div className="flex flex-row rounded-md bg-base text-text-base cursor-pointer p-1 w-fit my-2 hover:translate-y-1">
        <h2 className="text-base text-text-base mr-2 font-semibold">
          Add Task
        </h2>
        <AddCircleIcon />
      </div>
      {/* play songs div */}
      <div className="flex flex-row rounded-md cursor-pointer p-1 w-fit text-text-base bg-dark-base my-2">
        <h2 className="font-semibold mr-2 text-base text-text-base">
          Play Songs
        </h2>
        <PlayCircleIcon />
      </div>
      {/* quote div */}
      <div className="flex flex-row justify-center absolute inset-x-0 bottom-0">
        <p className="animate-bounce p-1 border-2 border-blue-base text-dark-base w-fit rounded-md my-2 bg-text-base text-base">
          Quote of the Day
        </p>
      </div>
    </div>
  );
}

export default App;
