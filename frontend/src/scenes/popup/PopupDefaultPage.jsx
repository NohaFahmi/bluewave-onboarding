import React, { useState, useEffect } from 'react';
import CreateActivityButton from "../../components/Button/CreateActivityButton/CreateActivityButton";
import HomePageTemplate from "../../templates/HomePageTemplate/HomePageTemplate";
import { ACTIVITY_TYPES } from "../../data/CreateActivityButtonData";
import ParagraphCSS from "../../components/ParagraphCSS/ParagraphCSS";
import { useNavigate } from 'react-router-dom';
import GuideMainPageTemplate from "../../templates/GuideMainPageTemplate/GuideMainPageTemplate";
import { getPopups } from "../../services/popupServices"; 
import { ACTIVITY_TYPES_INFO } from '../../data/GuideMainPageData';
import { deletePopup } from '../../services/popupServices';

const PopupDefaultPage = () => {
    const navigate = useNavigate();
    const [popups, setPopups] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [popupToDelete, setPopupToDelete] = useState();
    const [popupDeleted, setPopupDeleted] = useState(false);

    const handleSelect = (idItem) => {
        setSelectedItem(idItem);
    };

    const handleDelete = async () => {
        await deletePopup(popupToDelete)
        setPopupOpen(false);
        setPopupDeleted(prevState => !prevState);
    };

    const handleOpenPopup = (id) => {
        setPopupToDelete(id)
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const navigateToCreate = () => {
        navigate('/popup/create');
    };

    useEffect(() => {
        const fetchPopups = async () => {
            try {
                const popupData = await getPopups();
                setPopups(popupData);
            } catch (error) {
                console.error("Failed to fetch popups:", error);
            }
        };

        fetchPopups();
    }, [popupDeleted]);

    const style = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    };

    const items = popups.map(popups => ({
        idItem: popups.id,
        title: `Popup ${popups.id}`,
        text: popups.header,
        onDelete: () => handleOpenPopup(popups.id), // Placeholder for delete function
        onEdit: () => navigate('/popup/create', {state:{isEdit:true, id: popups.id}}), 
      }));


    return (
        <HomePageTemplate>
            {popups.length === 0 ? (
                <div style={style}>
                    <ParagraphCSS />
                    <CreateActivityButton type={ACTIVITY_TYPES.POPUPS} onClick={navigateToCreate} />
                </div>
            ) : (
                <GuideMainPageTemplate items={items} 
                    handleSelect={handleSelect}
                    handleDelete={handleDelete}
                    isPopupOpen={isPopupOpen}
                    handleClosePopup={handleClosePopup} 
                    type={ACTIVITY_TYPES_INFO.POPUPS} 
                    onClick={navigateToCreate}/>
            )}
        </HomePageTemplate>
    );
}

export default PopupDefaultPage;
