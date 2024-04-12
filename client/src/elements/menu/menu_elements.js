import {Nav} from "react-bootstrap";
import {motion} from "framer-motion";
import React from "react";
import {FormOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import './styles/style_menu_elements.css'
import {styles} from "./styles/style_menu_elements";
import {useDispatch} from "react-redux";
import {cleanUserInfo} from "../../actions/user";

export function TestsElement({isHidden}) {
    return (
        <motion.div
            initial={{opacity: isHidden ? 1 : 0}}
            animate={{opacity: isHidden ? 0 : 1}}
            transition={{
                delay: isHidden ? 0.8 : 1,
                duration: 0.8
            }}
        >
            <Nav.Link href="/tests" disabled={isHidden} style={styles.navItems}>
                <FormOutlined style={styles.iconStyle}/>
                <span
                    className="style-text-in-menu"> Тесты</span>
            </Nav.Link>
        </motion.div>
    )
}

export function ProfileElement({isHidden}) {
    return (
        <motion.div
            initial={{opacity: isHidden ? 1 : 0}}
            animate={{opacity: isHidden ? 0 : 1}}
            transition={{
                delay: isHidden ? 0.4 : 1.4,
                duration: 0.8
            }}
        >
            <Nav.Link href="/account" disabled={isHidden} style={styles.navItems}>
                <UserOutlined style={styles.iconStyle}/>
                <span
                    className="style-text-in-menu"> Профиль</span>
            </Nav.Link>
        </motion.div>
    )
}


export function LogoutElement({isHidden}) {
    const dispatch = useDispatch();

    const handlerClick = () => {
        dispatch(cleanUserInfo());
    }

    return (
        <motion.div
            initial={{opacity: isHidden ? 1 : 0}}
            animate={{opacity: isHidden ? 0 : 1}}
            transition={{
                delay: isHidden ? 0 : 1.8,
                duration: 0.8
            }}
        >
            <Nav.Link onClick={handlerClick} disabled={isHidden} style={styles.navItems}>
                <LogoutOutlined style={styles.iconStyle}/>
                <span
                    className="style-text-in-menu"> Выйти</span>
            </Nav.Link>
        </motion.div>
    )
}
