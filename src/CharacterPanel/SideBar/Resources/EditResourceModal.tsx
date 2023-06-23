import { SingleEditModalProps } from "../../../Modal/CommonEditableListModal";
import { GetDefault, Resource } from "../../slice/state/Resource";
import CommonModal from "../../../Modal/CommonModal";
import { useEffect, useState } from "react";
import InputText from "../../../Inputs/InputText";
import InputNumber from "../../../Inputs/InputNumber";
import { InputDropdownAllowNullValue } from "../../../Inputs/InputDropdown";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export const EditResourceModal: React.FunctionComponent<
    SingleEditModalProps<Resource>
> = (props) => {
    const [resource, setResource] = useState(GetDefault());
    const stats = useSelector(
        (state: RootState) =>
            state.characterPanel.generalInformation.stats.stats
    );

    useEffect(() => {
        setResource(props.item);
    }, [props.item, props.show]);

    const onResourceChanged = (propertiesToUpdate: Partial<Resource>) => {
        setResource((prevState) => {
            return { ...prevState, ...propertiesToUpdate };
        });
    };

    const getSelectedStat = (resource: Resource) => {
        const selectedStat = stats.find((s) => s.id === resource.baseStatId);

        if (selectedStat === undefined)
            return null;

        return selectedStat;
    };

    return (
        <CommonModal
            onAccept={(event) => props.onAccept(event, resource)}
            onClose={props.onClose}
            onHide={props.onHide}
            show={props.show}
            title={props.title}
        >
            <InputText
                label={"Display name"}
                value={resource.displayName}
                onChange={(event) =>
                    onResourceChanged({
                        displayName: event.currentTarget.value,
                    })
                }
            />
            <InputDropdownAllowNullValue
                values={stats}
                label={"Base stat"}
                selectedValue={getSelectedStat(resource)}
                getItemKey={(item) => item.id}
                getItemLabel={(item) => item.name}
                onChange={(_, item) =>
                    onResourceChanged({
                        baseStatId: item === null ? null : item.id,
                    })
                }
                nullValueItemLabel=""
            />
            <InputNumber
                label={"Percentage points of category increase"}
                onChange={(_, value) =>
                    onResourceChanged({
                        resourcePointsPerBaseStatPoint: value,
                    })
                }
                value={resource.resourcePointsPerBaseStatPoint}
            />
        </CommonModal>
    );
};
