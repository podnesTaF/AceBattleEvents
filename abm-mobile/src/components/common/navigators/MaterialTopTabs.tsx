import {
    createMaterialTopTabNavigator,
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions
} from "@react-navigation/material-top-tabs";
import {withLayoutContext} from "expo-router";
import {ParamListBase, TabNavigationState} from "@react-navigation/native";

const {Navigator} = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<MaterialTopTabNavigationOptions, typeof Navigator, TabNavigationState<ParamListBase>, MaterialTopTabNavigationEventMap>(Navigator)
export default MaterialTopTabs