export const defaultConfig = {
    storageName: 'gprConfig',
    state: 1,
    modules: [
        {
            name: 'HeaderModule',
            rootSelector: 'header.navbar.navbar-static-top'
        },
        {
            name: 'HnSItem',
            rootSelector: 'li.hs-item',
            reloadDetector: 'span#queueCounter'
        },
        {
            name: 'VideoItem',
            rootSelector: 'li:has(div.thumbnail.request-item)',
            reloadDetector: 'span#queue-counter'
        },
        {
            name: 'GalleryPhotoItem',
            rootSelector: 'li.photo-item-cell'
        },
        {
            name: 'PhotoLastItem',
            rootSelector: 'div.col-4'
        },
        {
            name: 'CheckLastPhotos',
            rootSelector: 'a#check-photos'
        }
        

        // TrashCollection: 'div#illegal-content-request-report tbody tr',
        // GalleryPhotoCollection: 'div#photo-container',
        // PhotoLastCollection: 'div.last_approved'
    ],
    customNodes: [
        {
            parentSelector: 'div.navbar-inner',
            appendType: 'insertBefore',
            node: 'div.gpr-topmenu',
            beforeSelector: 'div.brand'
        },
        {
            parentSelector: 'li.hs-item>form',
            appendType: 'appendChild',
            node: 'div.gpr-advanced-block',
        }
    ],
    services: {
        AdvancedMode: {
            state: 0,
            forbiddenPages: []
        },
        DisableAutoMistake: {
            state: 0,
            forbiddenPages: []
        },
        TopMenu: {
            state: 0,
            forbiddenPages: []
        },
        ReapproveFromLastQueue: {
            state: 1,
            forbiddenPages: []
        },
    },
    menuItems: [
        {
            name: 'Approve',
            href: 'https://my.platformphoenix.com/approve/index'
        },
        {
            name: 'FComm',
            href: '/approve/photoFemaleCommonApprove?queue=photo_female_common_approve'
        },
        {
            name: 'MComm',
            href: '/approve/photoFemaleCommonApprove?queue=photo_male_common_approve'
        }
    ]
};

