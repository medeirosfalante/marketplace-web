import PropTypes from "prop-types";
import Anchor from "@ui/anchor";
import { Home } from "../../../pages_template/explore-01";

const SubMenu = ({ categories }) => (
    <ul className="submenu">
        {categories.map((nav) => (
            <li key={nav.id._hex}>
                <Anchor
                    path={nav.icon}
                    className={nav.isLive ? "live-expo" : ""}
                >
                    {nav.name}
                    {/* {nav?.icon && <i className={`feather ${nav.icon}`} />} */}
                </Anchor>
            </li>
        ))}
    </ul>
);

SubMenu.propTypes = {
    menu: PropTypes.arrayOf(PropTypes.shape({})),
};

export default SubMenu;
