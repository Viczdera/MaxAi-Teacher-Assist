import styles from "./nav.module.scss";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useNewTaskModal } from "../../provider/contexts/newTaskContext";
import PlusIcon from "../../assets/icons/plus";

const NavDashboard = () => {
  const location = useLocation();
  const path = "/" + location.pathname.split("/")[1];
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
      navigate("/classroom");
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
                    path !== route.route ? styles.inactive : styles.active
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
              <PlusIcon />
              Assign homework
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavDashboard;
