import { useEffect, useRef, type ReactNode } from "react";
import {
    AccessibilityInfo,
    Animated,
    type StyleProp,
    type ViewStyle,
} from "react-native";

type AnimatedRevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
};

export default function AnimatedReveal({
  children,
  delay = 0,
  duration = 500,
  style,
}: AnimatedRevealProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    let activo = true;
    AccessibilityInfo.isReduceMotionEnabled().then((reducirMovimiento) => {
      if (!activo) return;
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: reducirMovimiento ? 1 : duration,
          delay: reducirMovimiento ? 0 : delay,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: reducirMovimiento ? 1 : duration,
          delay: reducirMovimiento ? 0 : delay,
          useNativeDriver: true,
        }),
      ]).start();
    });

    return () => {
      activo = false;
      opacity.stopAnimation();
      translateY.stopAnimation();
    };
  }, [delay, duration, opacity, translateY]);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}
