import { useState } from "react";
import styles from "./nav.module.scss";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AssignHomework from "../dialogs/assignHomework";

const NavDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navRoutes: {
    name: string;
    route: string;
    icon: React.ReactNode;
  }[] = [
    { name: "Dashboard", route: "/", icon: <div></div> },
    { name: "Classroom", route: "/classroom", icon: <div></div> },
    { name: "Resources", route: "/resourcess", icon: <div></div> },
  ];

  const changePage = (route: string) => navigate(route);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (location.pathname !== "/classroom") {
      navigate("/classroom?openModal=true");
      setTimeout(() => {
        navigate("/classroom?openModal=true&delay=true");
      }, 1000);
    } else {
      setIsOpen(true);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
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
                    location.pathname !== route.route
                      ? styles.inactive
                      : styles.active
                  } ${styles.navItem}`}
                >
                  {route.icon}
                  <span
                    style={{
                      color: `${
                        location.pathname !== route.route
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
      <AssignHomework isOpen={isOpen} onClose={handleClose} />
    </>
  );
};
//TODO: EXPORT ICONS
export default NavDashboard;
