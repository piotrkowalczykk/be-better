import { Layout } from "../../components/layout/Layout/Layout";
import { IconPicker } from "../../../../components/ui/IconPicker/IconPicker";
import { useState } from "react";

export const Feed = () => {

    const [icon, setIcon] = useState(null);
    console.log(icon);

    return (
        <Layout>
            <IconPicker value={icon} onChange={setIcon} />
        </Layout>
    );
}