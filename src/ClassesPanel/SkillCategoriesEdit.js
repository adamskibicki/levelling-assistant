import { faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import AddCategoryModal from './AddCategoryModal';
import './SkillCategories.scss';

function SkillCategoriesEdit(props) {
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

    const deleteCategory = (id) => {
        props.onChange(props.categories.filter(c => c.id !== id));
    };

    const addCategory = (id) => {
        props.onChange([...props.categories, props.userCategories.filter(uc => uc.id === id)[0]]);
    };
    
    return (
        <>
            <div>Selected categories:</div>
            <div className='skill-categories'>
                {
                    props.categories
                    .map((c) => (
                        <div className='skill-categories__category skill-categories__category--removable' key={c.id} onClick={() => deleteCategory(c.id)}>
                            <div className='skill-categories__category-name'>{c.name}</div>
                            <FontAwesomeIcon className='skill-categories__category-overlap' icon={faClose} />
                        </div>
                    ))
                }
            </div>
            <div>Available categories:</div>
            <div className='skill-categories'>
                {
                    props.userCategories && props.userCategories
                    .filter(uc => {
                        return props.categories.filter(c => c.id === uc.id).length === 0;
                    })
                    .map((uc) => (
                        <div className='skill-categories__category skill-categories__category--selectable' key={uc.id} onClick={() => addCategory(uc.id)}>
                            <div className='skill-categories__category-name'>{uc.name}</div>
                            <FontAwesomeIcon className='skill-categories__category-overlap' icon={faPlus} />
                        </div>
                    ))
                }
                <div className='skill-categories__category skill-categories__category--selectable' onClick={() => setShowAddCategoryModal(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                <AddCategoryModal show={showAddCategoryModal} onHide={() => setShowAddCategoryModal(false)} onClose={() => setShowAddCategoryModal(false)} onAccept={() => setShowAddCategoryModal(false)}/>
            </div>
        </>
    );
}

export default SkillCategoriesEdit;