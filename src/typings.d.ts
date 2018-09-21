/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
  id: string;
}
interface JQuery {
  markdown: (options: any) => any;
}
