import { atom, selector } from 'recoil';

const typeAtom = atom({
    key: 'TYPE',
    default: new Promise((resolve) => {
        const type = 0
        resolve(type);
    })
});

export const typeState = selector({
    key: 'TYPE_SELECTOR',
    get: ({ get }) => get(typeAtom),
    set: ({ set }, newValue) => {
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
    get: ({ get }) => get(typeTestAtom),
    set: ({ set }, newValue) => {
        set(typeTestAtom, newValue);
    }
});