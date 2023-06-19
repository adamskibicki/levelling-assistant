import { Category } from '../CharacterPanel/slice/state/Category';
import './SkillCategories.scss';

function SkillCategories(props: {
    categories: Category[];
}) {
    return (
        <div className='skill-categories'>
            {
                props.categories
                    .map((c, i) => (
                        <div className='skill-categories__category' style={{backgroundColor: c.displayColor}} key={i}>{c.name}</div>
                    ))
            }
        </div>
    );
}

export default SkillCategories;