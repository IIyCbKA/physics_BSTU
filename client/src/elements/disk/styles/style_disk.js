const iconMobile = {
  fontSize: "40px",
};

const iconPC = {
  fontSize: "80px",
};

const allIcon = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
};

const diskHeadIconStyle = {
  fontSize: "24px",
};

export const styles = {
  iconMobile: { ...iconMobile, ...allIcon },
  iconPC: { ...iconPC, ...allIcon },
  diskHeadIconStyle: diskHeadIconStyle,
};
