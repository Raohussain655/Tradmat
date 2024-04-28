import "@/styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { setUserLoggedIn, setAdminStatus, setChatId } from "../redux/userSlice";
import { getSession, SessionProvider } from "next-auth/react";
import FloatingButton from "../components/ChatButton";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const adminRoutes = [
    "/adminDashboard/message/list",
    "/adminDashboard/enrolled/list",
    "/adminDashboard/enrolled/assignment-list/[id]",
    "/adminDashboard/user/list",
    "/adminDashboard/user/[email]",
    "/adminDashboard/user/update/[email]",
    "/adminDashboard",
    "/adminDashboard/blog/create",
    "/adminDashboard/blog/list",
    "/adminDashboard/blog/update/[id]",
    "/adminDashboard/blog/update",
    "/adminDashboard/user/users",
    "/adminDashboard/category/create",
    "/adminDashboard/introduction/list",
    "/adminDashboard/introduction/create",
    "/adminDashboard/introduction/update",
    "/adminDashboard/course/create",
    "/adminDashboard/course/list",
    "/adminDashboard/course/chapters/[id]",
    "/adminDashboard/course/update/[courseId]/[chapterId]",
    "/adminDashboard/course/update-course/[courseId]",
  ];
  const chatRoutes = ["/chat"];
  const handleFetchChatId = async () => {
    try {
      const session = await getSession();
      if (!session) {
        router.push("/signin");
        return;
      }
      const response = await fetch(`/api/chats/create?currentUserId=${session.user.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch chat ID");
      }
      const data = await response.json();
      const  chatId= data._id;
      console.log(chatId);
      store.dispatch(setChatId(chatId));
    } catch (error) {
      console.error("Error fetching chat ID:", error);
    }
  };  
  useEffect(() => {
    const checkUserStatus = async () => {
      const session = await getSession();
      if (session && session.user.name) {
        store.dispatch(setUserLoggedIn(true));
        handleFetchChatId();
      }
      if (session && session.user.role === "admin") {
        store.dispatch(setAdminStatus(true));
      }
    };

    checkUserStatus();
  }, [router]);


  const isOnAdminPage = adminRoutes.includes(router.pathname);
  const isOnChatPage = chatRoutes.includes(router.pathname);

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        {!isOnAdminPage && <Navbar />}
        <Component {...pageProps} />
        {!isOnAdminPage && !isOnChatPage && <Footer />}
      </Provider>
    </SessionProvider>
  );
}
