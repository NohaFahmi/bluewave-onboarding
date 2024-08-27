import { React } from 'react';
import styles from './BannerLeftContent.module.scss';
import DropdownList from '../../DropdownList/DropdownList';
import { Radio } from "@mui/material";
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';

const BannerLeftContent = ({ setIsTopPosition, url, setUrl, setButtonAction }) => {
    const handleSetUrl = (event) => {
        setUrl(event.target.value);
      };
      const handleActionChange = (newAction) => {
        setButtonAction(newAction);
      };

    return (
        <div className={styles.container}>
            <h2>Action</h2>
            <DropdownList 
                actions={['No action', 'Open URL', 'Open URL in a new tab']} 
                onActionChange={handleActionChange}
            />
            <h2>Position</h2>
            <div className={styles.radioContent}>
                <Radio onClick={() => setIsTopPosition(true)} />
                <h3>Top (centered)</h3>
            </div>
            <div className={styles.radioContent}>
                <Radio onClick={() => setIsTopPosition(false)} />
                <h3>Bottom (centered)</h3>
            </div>
            <h2 style={{ marginBottom: 0 }}>URL</h2>
            <CustomTextField
                TextFieldWidth='241px'
                value={url}
                onChange={handleSetUrl} />
        </div>
    );
};

export default BannerLeftContent;
