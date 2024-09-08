import React from 'react';
import classes from "./CustomModal.module.css";

const CustomModal = ({children, visible, setVisible}) => {
    const stateOfVisible = [classes.Modal]

    if (visible === true){
        stateOfVisible.push(classes.active);
    }

    return (
        <div className={stateOfVisible.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.ModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default CustomModal;