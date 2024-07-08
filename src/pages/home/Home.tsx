import { useDisplayDevNotesStore } from "@/store/useDisplayDevNotesStore";

const Home = () => {
  const { selectedDevNotes } = useDisplayDevNotesStore();

  return (
    <div className="container min-h-screen h-full">
      {JSON.stringify(selectedDevNotes)}
    </div>
  );
};

export default Home;
