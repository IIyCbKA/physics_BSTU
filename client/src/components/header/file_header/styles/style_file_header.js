const navbarFileHeader = {
  minWidth: "340px",
  width: "100%",
  height: "60px",
  padding: 0,
  justifyContent: "center",
};

const containerHeaderAll = {
  height: "60px",
  minWidth: "340px",
  padding: 0,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  boxShadow: "inset 0px -1px 1px #EEEBE8",
};

const containerHeaderMobile = {
  width: "100%",
  borderRadius: "0px 0px 0px 0px",
};

const containerHeaderPC = {
  width: "calc(100% - 40px)",
  borderRadius: "0px 0px 12px 12px",
};

const iconsStyle = {
  fontSize: "24px",
  color: "#161616",
};

const navStyle = {
  padding: "12px",
  height: "100%",
  width: "100%",
  justifyContent: "flex-end",
  alignItems: "center",
  flexDirection: "row",
};

const navItemStyle = {
  padding: "0px",
  height: "36px",
  width: "36px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

const drawerStyle = {
  borderTopLeftRadius: "15px",
  borderTopRightRadius: "15px",
};

export const styles = {
  navbarFileHeader: navbarFileHeader,
  containerHeaderMobile: { ...containerHeaderAll, ...containerHeaderMobile },
  containerHeaderPC: { ...containerHeaderAll, ...containerHeaderPC },
  iconsStyle: iconsStyle,
  navStyle: navStyle,
  navItemStyle: navItemStyle,
  drawerStyle: drawerStyle,
};
