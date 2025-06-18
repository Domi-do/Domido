import { Box } from "@react-three/drei";

const TARGET_COLORS = { SUCCESS: "#28a745", PENDING: "#007BFF" };

const TargetPlaceholder = ({ position, isCompleted }) => {
  const color = isCompleted ? TARGET_COLORS.SUCCESS : TARGET_COLORS.PENDING;

  return (
    <Box
      position={position}
      args={[0.2, 1, 0.5]}
    >
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.6}
      />
    </Box>
  );
};

export default TargetPlaceholder;
