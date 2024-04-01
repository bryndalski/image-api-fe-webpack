export type FakeReactType = {

    /**
     * Unique id for the component. Autogenerated
     */
     componentId: string;


    /*
    Returns html string
     */
    render(): string;

    /**
     * Destroy the component
     */
    destroy(): void;

}