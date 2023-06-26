import {
    GetDefault,
    TierDescription,
} from "../../CharacterPanel/slice/state/TierDescription";
import InputText from "../../Inputs/InputText";
import ReorderableList from "../../Lists/ReorderableList";
import { AddButton } from "../../components/common/Buttons";

export default function TierDescriptionsEdit(props: {
    tierDescriptions: TierDescription[];
    onChange(editedTierDescriptions: TierDescription[]): void;
}) {
    const renderTierDescription = (tierDescription: TierDescription) => {
        return (
            <div>
                <InputText
                    value={tierDescription.description}
                    label={"Tier: " + tierDescription.tier}
                    onChange={(_, value) =>
                        onTierDescriptionTextChange(value, tierDescription)
                    }
                    multiline={true}
                />
            </div>
        );
    };

    const onTierDescriptionTextChange = (
        description: string,
        tierDescription: TierDescription
    ) => {
        const newTierDescription = {
            ...tierDescription,
            description: description,
        };

        props.onChange(
            props.tierDescriptions.map((td) => {
                if (newTierDescription.id === td.id) return newTierDescription;

                return td;
            })
        );
    };

    const updateTiers = (tierDescriptions: TierDescription[]) => {
        return tierDescriptions.map((td, i) => ({ ...td, tier: i + 1 }));
    };

    return (
        <>
            <ReorderableList
                getItemKey={(tierDescription) => tierDescription.id}
                items={props.tierDescriptions}
                renderItem={renderTierDescription}
                onChange={(tierDescriptions) => props.onChange(updateTiers(tierDescriptions))}
            />
            <AddButton
                onClick={(_) => {
                    props.onChange(updateTiers([...props.tierDescriptions, GetDefault()]));
                }}
            />
        </>
    );
}
