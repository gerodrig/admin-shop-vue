describe('Main.ts', () => {
    test('Should return proper env values', () => {

        expect(import.meta.env.VITE_BACKEND_API_URL).toBe('http://localhost:3000/api');
    });
})