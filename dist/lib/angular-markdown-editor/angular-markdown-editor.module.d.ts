import { EditorOption } from './models';
export declare class AngularMarkdownEditorModule {
    static forRoot(config?: EditorOption): {
        ngModule: typeof AngularMarkdownEditorModule;
        providers: {
            provide: string;
            useValue: EditorOption;
        }[];
    };
}
