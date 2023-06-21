import { Category } from '../CharacterPanel/slice/state/Category';
import { useUserCategories } from '../hooks/useUserCategories';
import './SkillCategories.scss';

export default function SkillCategoriesWrapper(props: {
    categoryIds: string[];
}) {
    const {getCategoriesByIds} = useUserCategories();

    return <SkillCategories categories={getCategoriesByIds(props.categoryIds)} />
}

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