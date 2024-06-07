import styles from "./nav.module.scss";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useNewTaskModal } from "../dialogs/task/newTaskProvider";

const NavDashboard = () => {
  const location = useLocation();
  const path = "/"+location.pathname.split("/")[1];
  const navigate = useNavigate();
  const { openModal } = useNewTaskModal();
  const navRoutes: {
    name: string;
    route: string;
    icon: React.ReactNode;
  }[] = [
    { name: "Dashboard", route: "/", icon: <div></div> },
    { name: "Classroom", route: "/classroom", icon: <div></div> },
  ];

  const changePage = (route: string) => navigate(route);

  const handleOpen = () => {
    if (path !== "/classroom") {
      navigate("/classroom?openModal=true");
      setTimeout(() => {
        navigate("/classroom?openModal=true&delay=true");
      }, 1000);
    } else {
      openModal();
    }
  };

  return (
    <>
      <div className={`parent ${styles.navParent}`}>
        <div className={`child ${styles.navCont}`}>
          {/* <UserAvatarWithName /> */}
          <div
            // display={{ xs: "none", lg: "flex" }}
            className={styles.navList}
          >
            {navRoutes.map((route, i) => (
              <button key={i} onClick={() => changePage(route.route)}>
                <div
                  className={`${
                    path !== route.route
                      ? styles.inactive
                      : styles.active
                  } ${styles.navItem}`}
                >
                  {route.icon}
                  <span
                    style={{
                      color: `${
                        path !== route.route
                          ? "var(--gray200)"
                          : "var(--bluePrimary)"
                      }`,
                    }}
                  >
                    {route.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div>
            <button onClick={handleOpen} className="button-default">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.13464 1.5V16.5M16.6346 9H1.63464"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Assign homework
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
//TODO: EXPORT ICONS
export default NavDashboard;
