import {atom, selector} from 'recoil';

const typeAtom = atom({
    key: 'TYPE',
    default: new Promise((resolve) => {
        const type = 0
        resolve(type);
    })
});

export const typeState = selector({
    key: 'TYPE_SELECTOR',
    get: ({get}) => get(typeAtom),
    set: ({set}, newValue) => {
        set(typeAtom, newValue);
    }
});

const typeTestAtom = atom({
    key: 'TYPE_TEST',
    default: new Promise((resolve) => {
        const type = 0
        resolve(type);
    })
});

export const typeTestState = selector({
    key: 'TYPE_TEST_SELECTOR',
    get: ({get}) => get(typeTestAtom),
    set: ({set}, newValue) => {
        set(typeTestAtom, newValue);
    }
});

export const showSidebarAtom = atom({
    key: "SHOW_SIDEBAR_ATOM",
    default: new Promise((resolve) => {
        const screenWidth = window.innerWidth;
        resolve(screenWidth > 992);
    }),
});

const tokenAtom = atom({
    key: "TOKEN_ATOM",
    default: new Promise((resolve) => {
        const token = localStorage.getItem("access-token");
        resolve(token);
    }),
});

export const tokenState = selector({
    key: "TOKEN_SELECTOR",
    get: ({get}) => get(tokenAtom),
    set: ({set}, newValue) => {
        if (!newValue) {
            localStorage.clear();
        } else {
            localStorage.setItem("access-token", newValue);
        }
        set(tokenAtom, newValue);
    },
});

const userProfile = atom({
    key: "USER_PROFILE",
    default: new Promise((resolve) => {
        const user = JSON.parse(localStorage.getItem("user-profile"));
        resolve(user);
    }),
});

export const userProfileState = selector({
    key: "USER_PROFILE_SELECTOR",
    get: ({get}) => get(userProfile),
    set: ({set}, newValue) => {
        if (!newValue) {
            localStorage.clear();
        } else {
            localStorage.setItem("user-profile", JSON.stringify(newValue));
        }
        set(userProfile, newValue);
    },
});
