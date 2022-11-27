"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const config = {
    mode: 'none',
    entry: {
        //puth our paths to lambdas
        'nodeHelloLambda': './services/node-lambda/hello.ts'
    },
    target: 'node',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        // Pass special config file
                        configFile: 'tsconfig.webpack.json'
                    }
                }
            }
        ]
    },
    externals: {
        'aws-sdk': 'aws-sdk'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        libraryTarget: 'commonjs2',
        path: (0, path_1.resolve)(__dirname, 'build'),
        filename: '[name]/[name].js'
    }
};
exports.default = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3ZWJwYWNrLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLCtCQUErQjtBQUUvQixNQUFNLE1BQU0sR0FBa0I7SUFFMUIsSUFBSSxFQUFFLE1BQU07SUFDWixLQUFLLEVBQUU7UUFDSCwyQkFBMkI7UUFDM0IsaUJBQWlCLEVBQUUsaUNBQWlDO0tBQ3ZEO0lBQ0QsTUFBTSxFQUFFLE1BQU07SUFDZCxNQUFNLEVBQUU7UUFDSixLQUFLLEVBQUU7WUFDSDtnQkFDSSxPQUFPLEVBQUUsY0FBYztnQkFDdkIsR0FBRyxFQUFFO29CQUNELE1BQU0sRUFBRSxXQUFXO29CQUNuQixPQUFPLEVBQUU7d0JBQ0wsMkJBQTJCO3dCQUMzQixVQUFVLEVBQUUsdUJBQXVCO3FCQUN0QztpQkFDSjthQUNKO1NBQ0o7S0FDSjtJQUNELFNBQVMsRUFBRTtRQUNQLFNBQVMsRUFBRSxTQUFTO0tBQ3ZCO0lBQ0QsT0FBTyxFQUFDO1FBQ0osVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztLQUM3QjtJQUNELE1BQU0sRUFBRTtRQUNKLGFBQWEsRUFBRSxXQUFXO1FBQzFCLElBQUksRUFBRSxJQUFBLGNBQU8sRUFBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO1FBQ2pDLFFBQVEsRUFBRSxrQkFBa0I7S0FDL0I7Q0FFSixDQUFBO0FBRUQsa0JBQWUsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9IGZyb20gJ3dlYnBhY2snO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuXG5jb25zdCBjb25maWc6IENvbmZpZ3VyYXRpb24gPSB7XG5cbiAgICBtb2RlOiAnbm9uZScsXG4gICAgZW50cnk6IHtcbiAgICAgICAgLy9wdXRoIG91ciBwYXRocyB0byBsYW1iZGFzXG4gICAgICAgICdub2RlSGVsbG9MYW1iZGEnOiAnLi9zZXJ2aWNlcy9ub2RlLWxhbWJkYS9oZWxsby50cydcbiAgICB9LFxuICAgIHRhcmdldDogJ25vZGUnLFxuICAgIG1vZHVsZToge1xuICAgICAgICBydWxlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGU6IC9ub2RlX21vZHVsZXMvLFxuICAgICAgICAgICAgICAgIHVzZToge1xuICAgICAgICAgICAgICAgICAgICBsb2FkZXI6ICd0cy1sb2FkZXInLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQYXNzIHNwZWNpYWwgY29uZmlnIGZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ0ZpbGU6ICd0c2NvbmZpZy53ZWJwYWNrLmpzb24nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIGV4dGVybmFsczoge1xuICAgICAgICAnYXdzLXNkayc6ICdhd3Mtc2RrJ1xuICAgIH0sXG4gICAgcmVzb2x2ZTp7XG4gICAgICAgIGV4dGVuc2lvbnM6IFsnLnRzJywgJy5qcyddXG4gICAgfSxcbiAgICBvdXRwdXQ6IHtcbiAgICAgICAgbGlicmFyeVRhcmdldDogJ2NvbW1vbmpzMicsXG4gICAgICAgIHBhdGg6IHJlc29sdmUoX19kaXJuYW1lLCAnYnVpbGQnKSxcbiAgICAgICAgZmlsZW5hbWU6ICdbbmFtZV0vW25hbWVdLmpzJ1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7Il19