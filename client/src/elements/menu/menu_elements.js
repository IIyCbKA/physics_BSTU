import {Nav} from "react-bootstrap";
import testsIcon from "../../components/header/icons/iconTest.png";
import {motion} from "framer-motion";
import React from "react";
import profileIcon from "../../components/header/icons/profileIconDark.png";
import './styles/style.css'

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
            <Nav.Link href="/test">
                <img
                    className="style-img-offcanvas"
                    src={testsIcon}
                    width="24px"
                    height="24px"
                    alt="tests"
                />
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
            <Nav.Link href="/login">
                <img
                    className="style-img-offcanvas"
                    src={profileIcon}
                    height="24px"
                    width="24px"
                    alt="logo"
                />
                <span
                    className="style-text-in-menu"> Account</span>
            </Nav.Link>
        </motion.div>
    )
}
