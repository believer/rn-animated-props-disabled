import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
	SharedValue,
	useAnimatedProps,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Button({
	index,
	page,
	text,
}: { index: number; page: SharedValue<number>; text: string }) {
	const buttonBackground = useAnimatedStyle(() => {
		const isDisabled = page.value === index;

		return {
			backgroundColor: isDisabled ? "lightgrey" : "lightgreen",
		};
	});

	const animatedProps = useAnimatedProps(() => {
		return {
			disabled: page.value === index,
		};
	});

	return (
		<AnimatedPressable
			animatedProps={animatedProps}
			style={[styles.button, buttonBackground]}
			onPress={() => (page.value = index)}
		>
			<Text>{text}</Text>
		</AnimatedPressable>
	);
}

export default function App() {
	const page = useSharedValue(0);

	return (
		<View style={styles.container}>
			<Button index={0} page={page} text="First" />
			<Button index={1} page={page} text="Second" />
			<Button index={2} page={page} text="Third" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		columnGap: 16,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		padding: 12,
	},
});
