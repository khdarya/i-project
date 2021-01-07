import React, {ChangeEvent, useState} from 'react';
// import SuperButton from "../common/SuperButton/SuperButton";
// import {InputModals} from "./InputModals";
// import {useDispatch, useSelector} from "react-redux";
// import {AppStoreType} from "../../bll/store";
// import {setNewPackName} from "../../bll/packsReducer";
//
// export const NewPackModule: React.FC = () => {
//
//     const newPackName = useSelector<AppStoreType>(state => state.packs.newPack.newPackName);
//     const dispatch = useDispatch();
//
//     const [open, setOpen] = useState(false);
//     const [value, setValue] = useState('value');
//
//     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         dispatch(setNewPackName(e.currentTarget.value))
//     }
//
//     return (
//         <div>
//             <SuperButton onClick={() => setOpen(true)}>New Pack Modal</SuperButton>
//
//             <InputModals close={() => setOpen(false)}
//                          open={open}
//                          setClose={() => setOpen(false)}
//                          value={value}
//                          setValue={setValue}
//             />
//
//             <div>
//                 {value}
//             </div>
//         </div>
//     )
//
// }