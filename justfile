build:
    bun i
    bun run build
    rm -rf ./vanilla/dist/*
    cd vanilla; bun i; bun run build
    cp dist/shgrid.svelte.d.ts vanilla/dist/shgrid.d.ts
    cp -r dist/js vanilla/dist
    rm vanilla/dist/js/*.test.d.ts
    rm vanilla/dist/js/*.test.js
    rm vanilla/dist/js/global.d.ts
