interface ILoadDataOpts {
  path: string;
  models: ILoadDataOptsModel;
}

interface ILoadDataOptsModel {
  [index: string]: {};
}

export async function loadData(opts: ILoadDataOpts) {
  const data: any = {};

  const modelNames = Object.keys(opts.models);
  for (let i = 0; i < modelNames.length; i++) {
    const modelName = modelNames[i];
    const model = opts.models[modelName] as any;
    data[modelName] = await new model({ path: opts.path }).load();
  }

  return data;
}
