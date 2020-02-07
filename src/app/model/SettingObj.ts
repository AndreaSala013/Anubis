import { ContainerGroup } from './ContainerGroup';

export class SettingObj{
    groups : ContainerGroup[];
    customGroups : SettingGroup;
    generalGroup : SettingGroup;
}

export class SettingGroup{
    size : number;
    expanded : boolean;
}