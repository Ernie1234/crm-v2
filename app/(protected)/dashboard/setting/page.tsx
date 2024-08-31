import { getUserNotification } from "@/actions/notification";
import Nav from "@/components/dashboardComponents/Nav";
import SettingComp from "@/components/dashboardComponents/setting/SettingComp";

export type TNotification =
  | {
      id: string;
      title: string | null;
      body: string;
      createdAt: Date;
      userId: string;
    }[]
  | Response
  | {
      error: string;
    };

export default async function page() {
  const notification = await getUserNotification();

  return (
    <div className="w-full">
      <Nav header="Setting" />
      <main className="bg-gray-100 w-full min-h-dvh overflow-scroll no-scrollbar flex flex-col p-4">
        <SettingComp notification={notification} />
      </main>
    </div>
  );
}
