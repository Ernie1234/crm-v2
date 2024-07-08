import Nav from "@/components/dashboardComponents/Nav";
import SettingComp from "@/components/dashboardComponents/setting/SettingComp";

export default function page() {
  return (
    <div className="w-full">
      <Nav header="Setting" />
      <main className="bg-gray-100 w-full min-h-dvh overflow-scroll no-scrollbar flex flex-col p-4">
        <SettingComp />
      </main>
    </div>
  );
}
