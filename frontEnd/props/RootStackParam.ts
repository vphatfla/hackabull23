import type {
    NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
    Home: NavigatorScreenParams<HomeTabParamList>;
    PostDetails: { id: string };
    NotFound: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
    Main: undefined;
    Home: undefined;
    Info: undefined;
};


// export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
//     CompositeScreenProps<
//         //BottomTabScreenProps<HomeTabParamList, T>,
//         RootStackScreenProps<keyof RootStackParamList>
//     >;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}