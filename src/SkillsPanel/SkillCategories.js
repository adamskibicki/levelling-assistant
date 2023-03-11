import './SkillCategories.scss';

function SkillCategories(props) {
    return (
        <div className='skill-categories'>
            {
                props.categories
                    .map((c, i) => (
                        <div className='skill-categories__category' key={i}>{c.name}</div>
                    ))
            }
        </div>
    );
}

export default SkillCategories;