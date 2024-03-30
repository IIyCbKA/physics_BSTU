import {Nav} from "react-bootstrap";
import {motion} from "framer-motion";
import React from "react";
import { FormOutlined, UserOutlined } from '@ant-design/icons';
import './styles/style_menu_elements.css'
import {styles} from "./styles/style_menu_elements";

export function TestsElement({isHidden}) {
    return (
        <motion.div
            initial={{opacity: isHidden ? 1 : 0}}
            animate={{opacity: isHidden ? 0 : 1}}
            transition={{
                delay: isHidden ? 0.4 : 1,
                duration: 0.8
            }}
        >
            <Nav.Link href="/tests" style={styles.navItems}>
                <FormOutlined style={styles.iconStyle}/>
                <span
                    className="style-text-in-menu"> Tests</span>
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
                delay: isHidden ? 0 : 1.4,
                duration: 0.8
            }}
        >
            <Nav.Link href="/login" style={styles.navItems}>
                <UserOutlined style={styles.iconStyle}/>
                <span
                    className="style-text-in-menu"> Account</span>
            </Nav.Link>
        </motion.div>
    )
}
