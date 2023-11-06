import { IUser } from "../models";

type AccountItem = {
    title: string;
    subtitle?: string;
    icon?: any;
    color: any;
    isDark?: boolean;
    link: any;
}

export const getAccountItems = (user: IUser): AccountItem[] => {
    const items: AccountItem[] = [
        {
            "title": "My Profile",
            "subtitle": "View your profile",
            "icon": "person",
            "color": "$green500",
            "isDark": true,
            "link": "/account/profile"
        },
        {
            "title": "Settings",
            "subtitle": "Manage your settings",
            "icon": "settings",
            "color": "$blue500",
            "isDark": true,
            "link": "/account/settings"
        },
        {
            "title": "Followings",
            "subtitle": "Your favorite teams and runners",
            "icon": "people",
            "color": "#1E1D1F",
            "isDark": true,
            "link": "/account/followings"
        }
    ]

    if(user.runner) {
        items.push({
            "title": "My Team",
            "subtitle": "View your team",
            "icon": "people",
            "color": "$orange500",
            "isDark": true,
            "link": "/account/team"
        })
    }

    return items;
}